// to call this file use: import { loadModel } from './utils/loadModel'
// loadModel.ts
import * as tf from '@tensorflow/tfjs';

export async function loadModel(url: string): Promise<tf.LayersModel> {
  const model = await tf.loadLayersModel(url);
  return model;
}
