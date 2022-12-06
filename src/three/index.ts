/*
 * @Descripttion:
 * @version:
 * @Author: 刘译蓬
 * @Date: 2022-05-26 16:29:25
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-12-06 14:36:17
 */
import {
  AnimationMixer,
  Camera,
  Clock,
  EquirectangularReflectionMapping,
  Group,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { CollisionController } from "./octreeCollision";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
export default class {
  private canvas!: HTMLCanvasElement; // canvas
  private renderer!: WebGLRenderer; // renderer
  private scene!: Scene; // Scene
  private camera!: PerspectiveCamera; // camera
  private controls!: CollisionController; // 控制器
  private mixer!:AnimationMixer
  private clock = new Clock()
  constructor(canvas: HTMLCanvasElement | undefined) {
    if (canvas) {
      this.canvas = canvas;
      this.initThree();
      this.defaultCamera();
      this.defaultLight();
      this.modelLoader(
        "/public/model/ship.glb",
        true,
        undefined,
        undefined,
        undefined,
        (model) => {
          // 设置相机位置
          if (this.scene.getObjectByName("cameraPosition")){
            this.camera.position.copy(
              this.scene.getObjectByName("cameraPosition")!.position
            );
          }
          // 动画
          console.log(model);
          this.mixer = new AnimationMixer(this.scene);
          const clips = model.animations;
          console.log(clips);
          clips.forEach( ( clip )=>{
            this.mixer.clipAction( clip ).play();
          } );
        }
      );
      // TODO: 后处理
      // TODO: 粒子
      // TODO: 设备朝向相机
    }
  }

  // 初始化three渲染器和场景
  private initThree() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene = new Scene();
    this.renderer.setAnimationLoop(() => {
      this.renderLoop();
    });
    window.addEventListener("resize", () => {
      this.onWindowResize();
    });
  }

  // 渲染循环
  private renderLoop() {
    const delta = this.clock.getDelta()
    this.renderer.render(this.scene, this.camera);
    this.controls?.update();
    this.mixer?.update(delta);
  }

  // viewResize
  private onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  // 默认相机
  private defaultCamera() {
    this.camera = new PerspectiveCamera(
      75,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      1000
    );
  }

  // 默认灯光
  private defaultLight() {
    // const light = new HemisphereLight(0xffffff, 0xcccccc, 1)
    const env = new TextureLoader().load("/public/img/Sky_Color.jpeg");
    env.mapping = EquirectangularReflectionMapping;
    this.scene.environment = env;
    // this.scene.add(light)
  }

  // 模型加载
  private modelLoader(
    path: string,
    autoAddToScene?: boolean,
    onLoading?: (process: ProgressEvent<EventTarget>) => {},
    onLoadded?:()=>{},
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
        console.log("loaded");
        if(onLoadded)onLoadded()
        if (autoAddToScene || autoAddToScene === undefined){
          if (onBeforeAddToScene) onBeforeAddToScene(model);
          this.scene.add(model.scene);
          if (onAfterAddToScene) onAfterAddToScene(model);
        }
      },
      (process) => {
        if (onLoading) onLoading(process);
        console.log("loading");
      },
      (errorInfo) => {
        console.log(errorInfo);
      }
    );
  }

  // 视差平移控制器
  public cameraControl(mouseX:number, mouseY:number) {
    this.camera.position.x = this.scene.getObjectByName("cameraPosition")!.position.x-this.canvas.width/10000/2+mouseX/10000
    this.camera.position.y = this.scene.getObjectByName("cameraPosition")!.position.y+this.canvas.height/10000/2-mouseY/10000
  }
}
