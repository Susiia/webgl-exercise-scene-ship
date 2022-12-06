/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2022-12-06 23:10:57
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-06 23:50:38
 */
import { Camera, OrthographicCamera, PerspectiveCamera, Scene, StereoCamera, WebGLRenderer } from "three";

/**
 * @Descripttion: 
 * @Author: 刘译蓬
 * @msg: 
 * @param {HTMLCanvasElement} canvas 画布
 * @param {PerspectiveCamera|OrthographicCamera} camera 相机
 * @return {*}
 */
export default function(canvas:HTMLCanvasElement,camera:PerspectiveCamera|OrthographicCamera){
    let renderer:WebGLRenderer
    let scene:Scene
    let renderLoop:Array<()=>void> = []
    renderer = new WebGLRenderer({
        canvas: canvas,
        antialias: true,
      });
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene = new Scene();
    renderer.setAnimationLoop(() => {
        renderLoop.forEach((loop)=>loop())
    });
    renderLoop.push(()=>{
        renderer.render(scene, camera)
    })
    // viewResize
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        if(camera instanceof PerspectiveCamera)camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      });
    return {
        renderer,
        scene,
        renderLoop
    }
}