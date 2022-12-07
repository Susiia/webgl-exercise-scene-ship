import { Camera, Vector3 } from "three";
/*
 * @Descripttion: parallaxTranslationController
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2022-12-06 14:09:31
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-07 19:42:57
 */
export default class {
    private camera: Camera;
    private canvas: HTMLCanvasElement;
    private centerPosition:Vector3;
    /**
     * @Descripttion: 
     * @Author: 刘译蓬
     * @msg: 
     * @param {Camera} Camera:需要控制的相机
     * @param {HTMLCanvasElement} HTMLCanvasElement:需要控制的canvas
     * @param {Vector3} centerPosition Vector3:中心位置坐标（视差移动都是基于这个点来进行的）
     * @return {*}
     */    
    constructor(camera: Camera,canvas: HTMLCanvasElement,centerPosition?:Vector3) {
        this.camera = camera;
        this.canvas = canvas;
        this.centerPosition = centerPosition||this.camera.position.clone();
        this.canvas.addEventListener("mousemove",this.active)
    }
    /**
     * @Descripttion: 监听动作
     * @Author: 刘译蓬
     * @msg: 
     * @param {MouseEvent} event
     * @return {*}
     */    
    private active = (event:MouseEvent)=>{
        this.camera.position.x = this.centerPosition.x-this.canvas.clientWidth/10000/2+event.offsetX/10000
        this.camera.position.y = this.centerPosition.y+this.canvas.clientWidth/10000/2-event.offsetY/10000
    }
    /**
     * @Descripttion:  移除控制器需要调用本方法移除鼠标监听
     * @Author: 刘译蓬
     * @msg: 
     * @return {*}
     */    
    public removeListener(){
        this.canvas.removeEventListener("mousemove",this.active)
    }
}