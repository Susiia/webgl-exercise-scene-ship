/*
 * @Descripttion:
 * @version:
 * @Author: 刘译蓬
 * @Date: 2022-05-26 16:29:25
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-07 00:10:49
 */
import {
  AnimationMixer,
  Clock,
  EquirectangularReflectionMapping,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import parallaxTranslationController from "./parallaxTranslationController";
import modelLoader from "./modelLoader";
import initThree from "./initThree";
export default class {
  private canvas: HTMLCanvasElement; // canvas
  private renderer: WebGLRenderer; // renderer
  private scene: Scene; // Scene
  private camera: PerspectiveCamera; // camera
  private controls!: parallaxTranslationController; // 控制器
  private renderLoop:Array<()=>void>
  private mixer!: AnimationMixer;
  private clock = new Clock();
  constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.camera = this.defaultCamera(); // 加载默认相机
      // TODO：initThree方法整理到模板项目中
      const {renderer,scene,renderLoop} = initThree(this.canvas,this.camera); // 初始化three
      this.renderer = renderer
      this.scene = scene
      this.renderLoop = renderLoop
      this.defaultLight(); // 加载默认灯光
      // 加载模型
      modelLoader(
        "/public/model/ship.glb",
        this.scene,
        true,
        (process) =>
          console.log(
            `loading:${Math.trunc((process.loaded / process.total) * 100)}`
          ),
        () => console.log("loaded"),
        () => {},
        (model) => {
          // 设置相机位置
          if (model.scene.getObjectByName("cameraPosition")) {
            this.camera.position.copy(
              model.scene.getObjectByName("cameraPosition")!.position
            );
          }
          // 动画
          this.mixer = new AnimationMixer(this.scene);
          const clips = model.animations;
          clips.forEach((clip) => {
            this.mixer.clipAction(clip).play();
          });
          this.renderLoop.push(()=>{
            const delta = this.clock.getDelta();
            this.mixer?.update(delta);
          })
          // 视差平移控制器
          this.controls = new parallaxTranslationController(
            this.camera,
            this.canvas,
            model.scene.getObjectByName("cameraPosition")!.position
          );
        }
      );
      // TODO: 后处理
      // TODO: 粒子
      // TODO: 设备朝向相机
  }
  
  // 默认相机
  private defaultCamera() {
    return new PerspectiveCamera(
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000
    );
  }

  // 默认灯光
  private defaultLight() {
    const light = new HemisphereLight(0xffffff, 0xcccccc, 1);
    this.scene.add(light);
    const env = new TextureLoader().load("/public/img/Sky_Color.jpeg");
    env.mapping = EquirectangularReflectionMapping;
    this.scene.environment = env;
  }

  // TODO:射线
}
