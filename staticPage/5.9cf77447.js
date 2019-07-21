(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5,6,7,8,9],{"53St":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width}},[t._v("折线图")])},i=[],r=a("MT78"),s=a.n(r);a("n60c");var o={name:"line-chart",props:{className:{type:String,default:"line-chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"},data:{type:Object,default:function(){return{}}}},methods:{initChart:function(){this.barChart=s.a.init(this.$el,"shine"),this.barChart.setOption({title:{text:"未来一周气温变化"},tooltip:{trigger:"axis"},grid:{top:50,left:"2%",right:30,bottom:"3%",containLabel:!0},legend:{data:["最高气温","最低气温"]},toolbox:{show:!0,feature:{dataView:{readOnly:!0},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:["周一","周二","周三","周四","周五","周六","周日"]},yAxis:{type:"value",axisLabel:{formatter:"{value} °C"}},series:[{name:"最高气温",type:"line",data:[11,11,15,13,12,13,10],markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}},{name:"最低气温",type:"line",data:[1,-2,2,5,3,2,0],markPoint:{data:[{name:"周最低",value:-2,xAxis:1,yAxis:-1.5}]},markLine:{data:[{type:"average",name:"平均值"},[{symbol:"none",x:"90%",yAxis:"max"},{symbol:"circle",label:{normal:{position:"start",formatter:"最大值"}},type:"max",name:"最高点"}]]}}]})}},created:function(){console.log(this),console.log(this.$el)},mounted:function(){this.initChart()}},l=o,c=(a("ey0n"),a("KHd+")),u=Object(c["a"])(l,n,i,!1,null,"73de44ec",null);e["default"]=u.exports},"6DpY":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-container"},[a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:15}},[a("el-col",{attrs:{lg:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("bar-chart")],1)]),a("el-col",{attrs:{lg:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("line-chart")],1)])],1),a("el-row",{attrs:{gutter:15}},[a("el-col",{attrs:{lg:8}},[a("pie-rose")],1),a("el-col",{attrs:{lg:8}},[a("radar")],1),a("el-col",{attrs:{lg:8}},[t._v("\n            3\n        ")])],1)],1)},i=[],r=a("jp/W"),s=a("53St"),o=a("KHfx"),l=a("cS0g"),c={components:{PieRose:o["default"],Radar:l["default"],BarChart:r["default"],LineChart:s["default"]},name:"index"},u=c,d=(a("wrOv"),a("KHd+")),h=Object(d["a"])(u,n,i,!1,null,"4dc72bea",null);e["default"]=h.exports},"8ZxN":function(t,e,a){},"C+Zk":function(t,e,a){"use strict";var n=a("FPnh"),i=a.n(n);i.a},FPnh:function(t,e,a){},K65B:function(t,e,a){},KHfx:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width}})},i=[],r=a("MT78"),s=a.n(r);a("n60c");var o={name:"pie-rose",props:{className:{type:String,default:"pie-rose-chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"},data:{type:Object,default:function(){return{}}}},methods:{initChart:function(){this.barChart=s.a.init(this.$el,"shine"),this.barChart.setOption({title:{text:"南丁格尔玫瑰图"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{x:"center",y:"bottom",data:["rose1","rose2","rose3","rose4","rose5","rose6","rose7","rose8"]},toolbox:{show:!0,feature:{saveAsImage:{show:!0}}},calculable:!0,series:[{name:"面积模式",type:"pie",radius:[15,90],roseType:"area",data:[{value:10,name:"rose1"},{value:5,name:"rose2"},{value:15,name:"rose3"},{value:25,name:"rose4"},{value:20,name:"rose5"},{value:35,name:"rose6"},{value:30,name:"rose7"},{value:40,name:"rose8"}]}]})}},created:function(){console.log(this),console.log(this.$el)},mounted:function(){this.initChart()}},l=o,c=(a("N6aa"),a("KHd+")),u=Object(c["a"])(l,n,i,!1,null,"22b48e0e",null);e["default"]=u.exports},N6aa:function(t,e,a){"use strict";var n=a("8ZxN"),i=a.n(n);i.a},cS0g:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width}})},i=[],r=a("MT78"),s=a.n(r);a("n60c");var o={name:"radar",props:{className:{type:String,default:"pie-rose-chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"},data:{type:Object,default:function(){return{}}}},methods:{initChart:function(){this.barChart=s.a.init(this.$el,"shine"),this.barChart.setOption({title:{text:"基础雷达图"},tooltip:{},legend:{data:["预算分配","实际开销"]},radar:{shape:"circle",radius:80,name:{textStyle:{color:"#fff",backgroundColor:"#999",borderRadius:3,padding:[3,5]}},indicator:[{name:"销售",max:6500},{name:"管理",max:16e3},{name:"信息技术",max:3e4},{name:"客服",max:38e3},{name:"研发",max:52e3},{name:"市场",max:25e3}]},series:[{name:"预算 vs 开销",type:"radar",itemStyle:{normal:{areaStyle:{type:"default"}}},data:[{value:[4300,1e4,28e3,35e3,5e4,19e3],name:"预算分配"},{value:[5e3,14e3,28e3,31e3,42e3,21e3],name:"实际开销"}]}]})}},created:function(){console.log(this),console.log(this.$el)},mounted:function(){this.initChart()}},l=o,c=(a("leBt"),a("KHd+")),u=Object(c["a"])(l,n,i,!1,null,"2aa7c455",null);e["default"]=u.exports},ey0n:function(t,e,a){"use strict";var n=a("K65B"),i=a.n(n);i.a},iwGf:function(t,e,a){},"jp/W":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width}},[t._v("饼图")])},i=[],r=a("MT78"),s=a.n(r);a("n60c");var o=3e3,l={name:"bar-chart",props:{className:{type:String,default:"bar-chart"},width:{type:String,default:"100%"},height:{type:String,default:"300px"},data:{type:Object,default:function(){return{}}}},methods:{initChart:function(){this.barChart=s.a.init(this.$el,"shine"),this.barChart.setOption({tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{top:10,left:"2%",right:"2%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value",axisTick:{show:!1}}],series:[{name:"pageA",type:"bar",stack:"vistors",barWidth:"60%",data:[79,52,200,334,390,330,220],animationDuration:o},{name:"pageB",type:"bar",stack:"vistors",barWidth:"60%",data:[80,52,200,334,390,330,220],animationDuration:o},{name:"pageC",type:"bar",stack:"vistors",barWidth:"60%",data:[30,52,200,334,390,330,220],animationDuration:o}]})}},created:function(){console.log(this),console.log(this.$el)},mounted:function(){this.initChart()}},c=l,u=(a("C+Zk"),a("KHd+")),d=Object(u["a"])(c,n,i,!1,null,"20f5a32a",null);e["default"]=d.exports},leBt:function(t,e,a){"use strict";var n=a("llmG"),i=a.n(n);i.a},llmG:function(t,e,a){},wrOv:function(t,e,a){"use strict";var n=a("iwGf"),i=a.n(n);i.a}}]);
//# sourceMappingURL=5.9cf77447.js.map