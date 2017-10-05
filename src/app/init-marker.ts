export class Init{
  load(){
    if(localStorage.getItem('markers')===null || localStorage.getItem('markers')===undefined){
      var markers = [
        {name:"start point",lat:51.678418,lng:7.809007,draggable:true},
        {name:"end point",lat:52.678418,lng:7.809007,draggable:true}
      ];
      localStorage.setItem('markers', JSON.stringify(markers));
    }
    else{
      console.log('loading markers .....');
    }
  }
}
