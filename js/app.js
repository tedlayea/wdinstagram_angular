console.log("Setup is OK")
let instagramData = [

  {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:1},
  {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:2},
  {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:3},
  {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:4}
]

angular
.module("wdinstagram",["ui.router"])
.config(["$stateProvider", RouterFunction])
.controller("mainController",[MainControllerFunction])
.controller("indexController",[IndexControllerFunction])
.controller("showController",["$stateParams",ShowControllerFunction])


function MainControllerFunction(){
  console.log("I am the main controller")
}
function IndexControllerFunction(){
  console.log("I am the index controller")
  this.datas = instagramData;
  this.createnew = function(){
    console.log("New clicked!")
    let newdata = { photo_url: this.name, body: this.message,author: this.photo  }
    this.datas.push(newdata)
    console.log(newdata)
    console.log(this.datas);
  };

}
function ShowControllerFunction($stateParams){
  console.log("I am the show controller")
  this.authori=instagramData[$stateParams.id-1]
  console.log($stateParams);
  this.destroy = function(){
    console.log("Delete clicked!")
   instagramData.splice($stateParams.id-1, 1);
  }
  this.update = function(){
    console.log("Update clicked!")
    this.id=instagramData[$stateParams.id-1]
    console.log(this.id);
  }

}

function RouterFunction($stateProvider){
  console.log('Router setup correctly')
  $stateProvider
  .state("index", {
    url: "/index",
    templateUrl: "js/ng-views/index.html",
    controller: "indexController",
    controllerAs: "vm"
  })
  .state("show", {
    url: "/index/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "showController",
    controllerAs: "vm"
   });
}
