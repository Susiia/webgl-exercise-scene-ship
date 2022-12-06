/*
 * @Descripttion:
 * @version:
 * @Author: 刘译蓬
 * @Date: 2022-12-06 20:14:38
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-06 20:28:33
 */
import { Scene } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


/**
 * @Descripttion: 
 * @Author: 刘译蓬
 * @msg: 
 * @param {*} void
 * @param {function} onLoadded
 * @param {function} onBeforeAddToScene
 * @param {function} onAfterAddToScene
 * @param {*} param5
 * @param {*} param6
 * @return {*}
 */
export default function (
  path: string,
  scene:Scene,
  autoAddToScene?: boolean,
  onLoading?: (process: ProgressEvent<EventTarget>) => void,
  onLoadded?: () => void,
  onBeforeAddToScene?: (model: GLTF) => void,
  onAfterAddToScene?: (model: GLTF) => void
) {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/lib/draco/");
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    path,
    (model) => {
      if (onLoadded) onLoadded();
      if (autoAddToScene || autoAddToScene === undefined) {
        if (onBeforeAddToScene) onBeforeAddToScene(model);
        scene.add(model.scene);
        if (onAfterAddToScene) onAfterAddToScene(model);
      }
    },
    (process) => {
      if (onLoading) onLoading(process);
    },
    (errorInfo) => {
      console.log(errorInfo);
    }
  );
}
