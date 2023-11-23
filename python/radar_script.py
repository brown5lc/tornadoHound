# Importing necessary libraries
import os
import io
import sys
import gzip
import boto3
from botocore import UNSIGNED
from botocore.client import Config
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
from scipy.spatial import KDTree
import cartopy.crs as ccrs
from cartopy.feature import NaturalEarthFeature
import numpy as np
from PIL import Image
import argparse
import base64

backup = sys.stdout
sys.stdout = open(os.devnull, 'w')
import pyart
sys.stdout = backup

# Constants
bucket_name = 'noaa-nexrad-level2'

radar_df = pd.read_csv('../public/radar_locations.csv')
radar_points = list(zip(radar_df['Latitude'], radar_df['Longitude']))
kdtree = KDTree(radar_points)

def find_nearest_radar_site(lat, lon):
    # Find the nearest radar site to the provided latitude and longitude
    radar_site = kdtree.query([lat, lon])[1]
    return radar_df.iloc[radar_site]['RadarCode']

def list_files(bucket_name, prefix):
    # List all files in the provided S3 bucket and prefix
    s3 = boto3.client('s3', config=Config(signature_version=UNSIGNED))
    results = []
    paginator = s3.get_paginator('list_objects_v2')
    
    for page in paginator.paginate(Bucket=bucket_name, Prefix=prefix):
        for content in page.get('Contents', []):
            results.append(content['Key'])
     
    return results


def find_most_recent_file(bucket_name, radar_site):
    # Find the most recent radar file for the provided radar site
    s3 = boto3.client('s3', config=Config(signature_version=UNSIGNED))
    files = list_files(bucket_name, radar_site)
    # return the most recent file from the list
    print("File Path: " + files[-1])
    return files[-1]

# Download the most recent radar file for the provided radar site
def download_and_decompress(filename):
    s3 = boto3.client('s3', config=Config(signature_version=UNSIGNED))

    # Using BytesIO to handle the file content in memory
    compressed_file_obj = io.BytesIO()

    try:
        # Download the file directly into memory
        s3.download_fileobj(bucket_name, filename, compressed_file_obj)

        # If the file is a gzip, decompress it
        if filename.endswith(".gz"):
            compressed_file_obj.seek(0)  # Go to the beginning of the file
            with gzip.GzipFile(fileobj=compressed_file_obj, mode='rb') as f_in:
                decompressed_data = io.BytesIO(f_in.read())
            return decompressed_data
        else:
            # If not a gzip, simply return the BytesIO object
            compressed_file_obj.seek(0)  # Go to the beginning of the file
            return compressed_file_obj

    except Exception as e:
        print(f"Failed to download and process file {filename}. Error: {e}")
        return None


# Visualizing the radar data
def visualize_radar_data(weather_data, lat, lon):

    # Read the radar data
    radar = pyart.io.read_nexrad_archive(weather_data)

    if 'velocity' not in radar.fields:
        print(f"Error processing {weather_data}. Velocity data is missing.")
        return

    # Extracting the data for velocity
    sweep = 3  # Adjust the sweep index as needed
    data = radar.get_field(sweep, 'velocity')
    x, y, _ = radar.get_gate_x_y_z(sweep)
    x /= 1000.0  # Convert to km
    y /= 1000.0  # Convert to km

    # Convert Cartesian x and y to latitudes and longitudes
    lon_offset = x / (111.0 * np.cos(np.radians(radar.latitude['data'][0])))
    lat_offset = y / 111.0
    actual_lons = radar.longitude['data'][0] + lon_offset
    actual_lats = radar.latitude['data'][0] + lat_offset

    # Create the plot
    fig, ax = plt.subplots(figsize=(10, 10), subplot_kw={'projection': ccrs.PlateCarree()})
    ax.pcolormesh(actual_lons, actual_lats, data, vmin=-60, vmax=60, cmap=pyart.graph.cm.NWSVel)

    # Setting the plot extent
    buffer_in_degrees = 30.0 / 69.0  # 30 miles to degrees
    ax.set_xlim([lon - buffer_in_degrees, lon + buffer_in_degrees])
    ax.set_ylim([lat - buffer_in_degrees, lat + buffer_in_degrees])

    ax.axis('off')

    # Save the velocity plot to a BytesIO object
    velocity_img = io.BytesIO()
    plt.savefig(velocity_img, format='png', bbox_inches='tight', pad_inches=0)
    velocity_img.seek(0)  # Go back to the beginning of the BytesIO object
    plt.close(fig)

     # ------ Reflectivity Plot ------
    sweep_reflectivity = 0  # Adjust the sweep index as needed for reflectivity
    data_reflectivity = radar.get_field(sweep_reflectivity, 'reflectivity')
    x_reflectivity, y_reflectivity, _ = radar.get_gate_x_y_z(sweep_reflectivity)
    x_reflectivity /= 1000.0  # Convert to km
    y_reflectivity /= 1000.0  # Convert to km

    # Convert Cartesian x and y to latitudes and longitudes for reflectivity
    lon_offset_reflectivity = x_reflectivity / (111.0 * np.cos(np.radians(radar.latitude['data'][0])))
    lat_offset_reflectivity = y_reflectivity / 111.0
    actual_lons_reflectivity = radar.longitude['data'][0] + lon_offset_reflectivity
    actual_lats_reflectivity = radar.latitude['data'][0] + lat_offset_reflectivity

    # Create the reflectivity plot
    fig2, ax2 = plt.subplots(figsize=(10, 10), subplot_kw={'projection': ccrs.PlateCarree()})
    ax2.pcolormesh(actual_lons_reflectivity, actual_lats_reflectivity, data_reflectivity, vmin=-32, vmax=64, cmap=pyart.graph.cm.NWSRef)

    # Setting the plot extent similar to the first plot
    ax2.set_xlim([lon - buffer_in_degrees, lon + buffer_in_degrees])
    ax2.set_ylim([lat - buffer_in_degrees, lat + buffer_in_degrees])

    # Adding state lines
    states = NaturalEarthFeature(category='cultural', scale='50m', facecolor='none', name='admin_1_states_provinces_lines')
    ax2.add_feature(states, edgecolor='black')

    # Remove axis, gridlines, coastlines, and frame for reflectivity plot
    ax2.axis('off')
    ax2.gridlines(draw_labels=False)
    ax2.coastlines('10m', linewidth=0.8)
    ax2.set_frame_on(False)

    # Save the reflectivity plot to a BytesIO object
    reflectivity_img = io.BytesIO()
    plt.savefig(reflectivity_img, format='png', bbox_inches='tight', pad_inches=0)
    reflectivity_img.seek(0)  # Go back to the beginning of the BytesIO object
    plt.close(fig2)

    return velocity_img, reflectivity_img

def encode_image(image_buffer):
    return base64.b64encode(image_buffer.getvalue()).decode('utf-8')

def main(lat, lon):
    # Take the users latitude and longitude and find the nearest radar
    radar_site = find_nearest_radar_site(lat, lon)
    print("Radar Site: " + radar_site)

    # Create a prefix with the radar site using the current date time
    now = datetime.utcnow() # Using UTC because that's what NEXRAD expects

    prefix = f'{now.year}/{now.month:02}/{now.day:02}/{radar_site}'

    filename = find_most_recent_file(bucket_name, prefix)

    # Download the radar file
    decompressed_data = download_and_decompress(filename)

    # Visualize the radar file
    velocity_img, reflectivity_img = visualize_radar_data(decompressed_data, lat, lon)

    # Display the velocity plot
    with Image.open(velocity_img) as img:
        resized_velocity_img = img.resize((224, 224))

        resized_velocity_io = io.BytesIO()
        resized_velocity_img.save(resized_velocity_io, format='png')
        resized_velocity_io.seek(0)

    encoded_velocity_img = encode_image(resized_velocity_io)
    encoded_reflectivity_img = encode_image(reflectivity_img)

    return encoded_velocity_img, encoded_reflectivity_img

if __name__ == "__main__":
    # Example latitude and longitude
    parser = argparse.ArgumentParser(description='Get latitude and longitude')
    parser.add_argument('lat', type=float, help='Latitude')
    parser.add_argument('lon', type=float, help='Longitude')

    args = parser.parse_args()

    main(args.lat, args.lon)
