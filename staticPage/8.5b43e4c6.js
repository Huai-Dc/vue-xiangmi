(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"53St":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width}},[t._v("折线图")])},i=[],r=a("MT78"),o=a.n(r);a("n60c");var s={name:"line-chart",props:{className:{type:String,default:"line-chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"},data:{type:Object,default:function(){return{}}}},methods:{initChart:function(){this.barChart=o.a.init(this.$el,"shine"),this.barChart.setOption({title:{text:"未来一周气温变化"},tooltip:{trigger:"axis"},grid:{top:50,left:"2%",right:30,bottom:"3%",containLabel:!0},legend:{data:["最高气温","最低气温"]},toolbox:{show:!0,feature:{dataView:{readOnly:!0},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:["周一","周二","周三","周四","周五","周六","周日"]},yAxis:{type:"value",axisLabel:{formatter:"{value} °C"}},series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10],markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0],markPoint:{data:[{name:"周最低",value:-2,xAxis:1,yAxis:-1.5}]},markLine:{data:[{type:"average",name:"平均值"},[{symbol:"none",x:"90%",yAxis:"max"},{symbol:"circle",label:{normal:{position:"start",formatter:"最大值"}},type:"max",name:"最高点"}]]}}]})}},created:function(){console.log(this),console.log(this.$el)},mounted:function(){this.initChart()}},l=s,c=(a("ey0n"),a("KHd+")),d=Object(c["a"])(l,n,i,!1,null,"73de44ec",null);e["default"]=d.exports},K65B:function(t,e,a){},ey0n:function(t,e,a){"use strict";var n=a("K65B"),i=a.n(n);i.a}}]);
//# sourceMappingURL=8.5b43e4c6.js.map