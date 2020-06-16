import { interaction } from "pixi.js";

export class Tree<T>{
    root: TreeNode<T>;
    height: number; 
}
export class TreeNode<T>{
    parent: TreeNode<T>;
    children: TreeNode<T>[];
    information: T;

    constructor(info: T, parent: TreeNode<T>){
        this.information = info;
        this.parent = parent;
    }

    get getParent(){
        return this.parent;
    }

    get getChildren(){
        return this.children;
    }

    public getChild(index: number){
        if(index > this.children.length - 1 || index < 0){ 
            return null;
        }
        return this.children[index];
    }

    public setChildren(children: T[]){
        for(let i = 0; i < children.length; i++){
            this.children.push(new TreeNode<T>(children[i], this));
        }
    }
    public appendChild(child:T){
        this.children.push(new TreeNode<T>(child, this))
    }
    
}