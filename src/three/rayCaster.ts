/*
 * @Descripttion:射线抓取方法
 * @version:
 * @Author: 刘译蓬
 * @Date: 2022-12-07 23:35:57
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-07 23:51:52
 */
import {
  Camera,
  Intersection,
  Object3D,
  Raycaster,
  Scene,
  Vector2,
} from "three";

/**
 * @Descripttion: 射线
 * @Author: 刘译蓬
 * @msg: 射线抓取方法
 * @param {Camera} Camera 相机
 * @param {Scene} Scene 场景
 * @param {Object3D[]} Object3D[] 需要交互的object3d
 * @param {function} function 命中后的回调，参数返回去命中的object3d
 * @param {Array<() => void>} Array [可选]渲染循环，如果传了这玩应那射线就在渲染循环中进行，否则在window.mouseMove事件中执行
 * @return {*}
 */
export default function (
  camera: Camera,
  scene: Scene,
  interactionObjects: Object3D[],
  hittingCallBack: (hit: Intersection) => void,
  renderLoop?: Array<() => void>
) {
  const pointer = new Vector2();
  const raycaster = new Raycaster();
  // 需要循环的方法
  const looping = () => {
    const intersects = raycaster.intersectObjects(interactionObjects);
    intersects.forEach((hit) => {
      hittingCallBack(hit);
    });
  };
  // 事件
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    if (!renderLoop) looping(); // 如果没把渲染循环传过来则在事件中执行looping
  });
  if (renderLoop) renderLoop.push(looping); // 如果传了渲染循环则在渲染循环中执行looping
}
