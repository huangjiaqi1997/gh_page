require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';


// 图片数据 => 图片数据和地址
var imageDatas = require('json-loader!../data/imageDatas.json');
// 自执行函数，图片名信息 -> URL信息
imageDatas = (function genImageData(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);
//获取区间内随机数
function getRangeRandom (low, hight) {
    return Math.ceil(Math.random() * (hight - low) + low);
}
// -30° ~ +30°
function get30DegRandom() {
    return((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}


// 创建图片及其描述区ImgFigure
var ImgFigure = React.createClass({
    // 点击处理函数（进行翻转或者居中）
    handleClick: function (e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    },


    render: function() {

        // 如果props中指定了此图位置信息，则使用
        var styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        // 如果props旋转角度有值并且不为0，添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'webkitTransform', '']).forEach(function (value) {
                {
                    styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
                }
            }.bind(this));
        }
        // 如果props中isInverse为true，则添加className
        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        // 如果props.arrange.isCenter
        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    {<div className="img-back" onClick={this.handleClick}>
                        <p> {this.props.data.desc} </p>
                    </div>}
                </figcaption>
            </figure>
        );
    }
});


// 控制组件
var ControllerUnit = React.createClass({
    handleClick: function (e) {
        // 点击选中态的按钮，翻转图片
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    },

    render: function () {
        var controllerUnitClassName = 'controller-unit';
        //检查各index对应的是居中还是翻转态
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center';
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += ' is-inverse';
            }
        }
        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}> </span>
        );
    }

});


/**
 * 掌管所有数据和数据切换
 */
class AppComponent extends React.Component{
    constructor(props){
        super(props);
        // 声明img-figure在三区域初始坐标范围 this.Constant
        this.Constant= {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: { //横向 (leftSecX[~], 0) or (rightSecX[~], 0)
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        };

    }

    state={imgsArrangeArr:[]}; // 位置状态数组


    //改变图片的className状态 (翻转图片)
    inverse(index) {
        return function () {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({imgsArrangeArr: imgsArrangeArr});
        }.bind(this);
    }


    // 重新计算、布局所有图片
    rearrange(centerIndex){
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            // 范围
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), //上区域显示1张或0张图片
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        //首先居中centerIndex的图片，不需旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };
        //上册图片状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        //布局旋转位于上侧的图片
        imgsArrangeTopArr.forEach(function(value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        });
        //布局左右两侧图片
        for (var i = 0, j = imgsArrangeArr.length, k = j /2; i < j; i++) {
            var hPosRangeLORX = null;
            //前半部分布局左边，后半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }

        /*在图片位置计算完后，监视图片位置bug*/
        /*debugger;*/

        //插回取出项
        if (imgsArrangeTopArr && imgsArrangeArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0,   imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }


    // 调用rearrange函数，居中index图片
    center(index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    }

// getInitialState () {
//     return {
//         imgsArrangeArr: [
//             {
//                 pos: {
//                     left: '0',
//                     top: '0'
//                 },
//                 rotate: 0 //旋转角度
//                 isInverse: false, //图片正反面
//                 isCenter: false //居中？
//             }
//         ]
//     }
// }




// 组件加载后，计算舞台、图片及三区域大小
    componentDidMount() {
        // 舞台大小
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
        // image-figure大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
        // 三区域取值范围
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };
        //左右
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        // 上侧
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 2;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);
    }



    render() {
        // 放置图片figures和控制组件ControllerUnit
        var controllerUnits = [],
            imgFigures = [];

        // 初始化，遍历图片状态添加信息，并添加属性(位置、旋转角度、正反、居中)
        //添加ControllerUnit
        imageDatas.forEach(function(value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        right: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }
            imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);

            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
        }.bind(this));


        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits }
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
