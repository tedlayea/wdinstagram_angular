console.log("Setup is OK")
// let instagramData = [
//
//   {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:1},
//   {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:2},
//   {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:3},
//   {photo_url: "www.jpg", author:  "aaa", body: "asefldsjflsdlrleklk", id:4}
// ]

angular
.module("wdinstagram",["ui.router","ngResource"])
.config(["$stateProvider", RouterFunction])
.controller("mainController",[MainControllerFunction])
.controller("indexController",["InstagramFactory",IndexControllerFunction])
.controller("showController",["InstagramFactory","$stateParams",ShowControllerFunction])
.controller("newController",["InstagramFactory",NewControllerFunction])
.controller("editController", ["InstagramFactory","$stateParams",EditControllerFunction]);
.factory( "InstagramFactory", ["$resource",InstagramFactoryFunction]);


function MainControllerFunction(){
  console.log("I am the main controller")
}

function IndexControllerFunction(InstagramFactory){
  console.log("I am the index controller")
  this.entrys = InstagramFactory.query();
  // this.datas = instagramData;
  // this.createnew = function(){
  //   console.log("New clicked!")
  //   let newdata = { photo_url: this.name, body: this.message,author: this.photo  }
  //   this.datas.push(newdata)
  //   console.log(newdata)
  //   console.log(this.datas);
  // };

}
function ShowControllerFunction(InstagramFactory, $stateParams){
  console.log("I am the show controller")
  this.entry = InstagramFactory.$get({id: $stateParams.id});
  console.log(this.entry);

  // this.authori=instagramData[$stateParams.id-1]
  // console.log($stateParams);
  // this.destroy = function(){
  //   console.log("Delete clicked!")
  //  instagramData.splice($stateParams.id-1, 1);
  // }
  // this.update = function(){
  //   console.log("Update clicked!")
  //   this.id=instagramData[$stateParams.id-1]
  //   console.log(this.id);
  //  let editdata = { photo_url: this.name, body: this.message,author: this.photo  }
  //  this.instagramData[id]=editdata
  //  console.log(editdata)
  // }

}
function NewControllerFunction(InstagramFactory){
  console.log("I am the new controller");
  this.entry = new InstagramFactory();
    this.create = function(){
      this.entry.$save()
    }
}

function EditControllerFunction(InstagramFactory, $stateParams ){
    this.entry = InstagramFactory.get({id: $stateParams.id});
    this.update = function(){
      this.entry.$update({id: $stateParams.id})
    }
    this.destroy = function(){
      this.entry.$delete({id: $stateParams.id});
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
  .state("new", {
   url: "/index/new",
   templateUrl: "js/ng-views/new.html",
   controller: "newController",
   controllerAs: "vm"
 })
  .state("show", {
    url: "/index/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "showController",
    controllerAs: "vm"
   })
 .state("edit", {
   url: "/index/:id/edit",
   templateUrl: "js/ng-views/edit.html",
   controller: "editController",
   controllerAs: "vm"
  })

}
function InstagramFactoryFunction($resource){
  return $resource("http://localhost:3000/entries/:id" )
}
