Page({
data:{
    school:{},
},
onLoad: function(options){
    this.setData({
        school: JSON.parse(options.schoolJson),
    });
}

})