import { Mesh, Scene,BufferGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
/*
 * @Descripttion:生成树
 * @version:
 * @Author: 刘译蓬
 * @Date: 2022-08-02 16:49:18
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-08-03 08:51:24
 */
export default class makeTree {
  private scene: Scene;
  private mesh: Mesh;
  private sampler!: MeshSurfaceSampler;
  private geometrys!:BufferGeometry[]
  
  /**
   * @Descripttion: 生成树
   * @Author: 刘译蓬
   * @msg: 
   * @param {Scene} 场景
   * @param {Mesh} 需要生成树的mesh
   * @param {number} 树数量
   * @param {string} 树模型路径列表
   * @return {*}
   */
  constructor(
    scene: Scene,
    mesh: Mesh,
    treeAmount: number,
    treeModelList: string[]
  ) {
    this.scene = scene;
    this.mesh = mesh;
    this.initSampler();
    this.loadTrees(treeModelList)
  }
  /**
   * @Descripttion: 初始化网格表面取样器
   * @Author: 刘译蓬
   * @msg:
   * @return {*}
   */
  private initSampler() {
    this.sampler = new MeshSurfaceSampler(this.mesh)
      .setWeightAttribute(null)
      .build();
  }
  /**
   * @Descripttion: 加载树
   * @Author: 刘译蓬
   * @msg: 
   * @param {string} 树模型路径列表
   * @return {*}
   */  
  private loadTrees(treeModelList:string[]){
    treeModelList.forEach(path=>{
        this.modelLoader(path)
    })
  }
  /**
   * @Descripttion: 模型加载方法
   * @Author: 刘译蓬
   * @msg: 
   * @param {string} 路径
   * @return {*}
   */  
  private modelLoader (path:string) {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/lib/draco/')
    loader.setDRACOLoader(dracoLoader)
    loader.load(
      path,
      model => {
        console.log(`${path}model`);
      },
      process => {
        console.log('loadingTree')
      },
      errorInfo => {
        console.log(errorInfo)
      }

    )
  }
}
