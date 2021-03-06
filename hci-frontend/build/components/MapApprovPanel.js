import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VideoSequence from './VideoSequence';
import ConceptSequence from './ConceptSequence';
import RelatedVideosPanel from './RelatedVideosPanel'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Graph from '../newdirected/Graph';

const styles = ({
    rootTitle:{
        // margin:10,
        paddingBottom:20,
        textAlign:"center",
        fontSize:20,
        fontFamily:"Cambria"
    },
    containerTitle:{
        display:"flex",
        fontSize:14,
        fontWeight:"bold"
    },
    OuterContainer: {
        display: 'flex',
        flexDirection: "row",
        position:"absolute",
        // left:930,
        right:'0%',
        flexWrap: 'no-wrap',
        zIndex:6,
        // margin:10,
        // padding:10
        width:window.innerWidth - 50,
        height:window.innerHeight - 100
    },
  
  paper2: {
    width: 1560,
    // height: 850,
    overflowX: "hidden",
    overflowY: "scroll",
    padding: 15,
    margin : 15,
  },
  paper2_UpperContainer: {
    display: 'flex',
    flexDirection: "column",
  },
  paper2_BelowContainer: {
    display: 'flex',
    flexDirection: "row",
  },
  container3_1: {
    width: 225,
    // height: 500,
  },
  container3_2: {
    width: 265,
    // height: 500,
  },
  CloseBotton: {
    // marginLeft: 5,
    float:"right",
    marginRight: 1,

  },
  content:{
    // display: "block",
    margin: "auto",
    display:"flex"
  }
});
var SentRange = []
var ConceptRange = []
class MapApprovPanel extends Component {
    constructor(props) {
        super(props);
        this.CloseOnClick = this.CloseOnClick.bind(this);
        console.log("before getting, this.props.NewJson == ", this.props.NewJson);
    //for getting new json---------------------------------
        var tmp=this;
        fetch('http://localhost:8001/GetJson/')     //??????????????????getJson
        .then(function (res) {
        //    console.log(res.json());
            return res.json();
        }).then(function(myJson) {
            console.log(myJson);
            tmp.props.SetNewJson(myJson);
            return myJson;
          });
        this.props.SetNewJson(tmp);
        console.log("this.props.NewJson == ", this.props.NewJson);
            
        
    //for drawing map-----------------------
            //console.log("[graph]", ",", this.props.NewJson.search_info.key);
            // console.log("cheeeee",this.props.data.concept_relationship.nodes);
            // calcalate SentimentScoreRange [SentScoreMin,SentScoreMax];
            /*var tmpList = [];
            for (var e in this.props.NewJson.videos_info) {
                tmpList.push(this.props.NewJson.videos_info[e].userFeedbackScore);
            };
            var tmpList2 = [];
            for (var e in this.props.NewJson.concept_relationship.nodes) {
                tmpList2.push(this.props.NewJson.concept_relationship.nodes[e].count);
            };
            // console.log("SentRange",[Math.min(...tmpList),Math.max(...tmpList)]);
            // console.log("tmpList2",tmpList2);
            SentRange = [Math.min(...tmpList), Math.max(...tmpList)];
            ConceptRange = [Math.min(...tmpList2), Math.max(...tmpList2), tmpList2.reduce((a, b) => a + b, 0)];
            console.log(this.props.NewJson);
            */
        }
    componentDidUpdate(prevProps) {
        // ?????????????????????????????? prop??????
        if (this.props !== prevProps) {
          this.forceUpdate();
        }
      }
      componentWillMount() {
        console.log("[graph]", ",", this.props.data.search_info.key);
        // console.log("cheeeee",this.props.data.concept_relationship.nodes);
        // calcalate SentimentScoreRange [SentScoreMin,SentScoreMax];
        var tmpList = [];
        for (var e in this.props.data.videos_info) {

            tmpList.push(this.props.data.videos_info[e].userFeedbackScore);
        };
        var tmpList2 = [];
        for (var e in this.props.data.concept_relationship.nodes) {
            tmpList2.push(this.props.data.concept_relationship.nodes[e].count);
        };
        // console.log("SentRange",[Math.min(...tmpList),Math.max(...tmpList)]);
        // console.log("tmpList2",tmpList2);
        SentRange = [Math.min(...tmpList), Math.max(...tmpList)];
        ConceptRange = [Math.min(...tmpList2), Math.max(...tmpList2), tmpList2.reduce((a, b) => a + b, 0)];
    }
    CloseOnClick(){
        this.props.SetMapConsult("dont_ask");
    }
    render() {

        if(this.props.MapConsult==true){
            console.log(this.props.NewJson);
            return (
                <div style = {styles.OuterContainer}>
                    {/* <Paper style={styles.paper2} elevation={13}> */}
                    <Paper style= {Object.assign({}, styles.paper2, {height:window.innerHeight-130})} elevation={13}>
                    <div style={styles.rootTitle}>
                    {"Map Approval Consult"}
                    <IconButton style={styles.CloseBotton} color="inherit" aria-label="Close">
                        <CloseIcon onClick={this.CloseOnClick.bind(this)}/>
                    </IconButton>
                    </div>
                    <div style = {styles.paper2_UpperContainer}>
                        <div style={styles.content}>
                            <button>Approve</button>
                            <button onClick = {this.CloseOnClick}>Disprove</button>
                        </div>
                        
                    </div>
                    <div height="5"><hr></hr></div>
                    <div style = {styles.paper2_BelowContainer}>
                        <Graph data={this.props.NewJson}
                                width={window.innerWidth} height={window.innerHeight}
                                SentRange={SentRange}
                                ConceptRange={ConceptRange}
                            />
                    </div>
                    </Paper>  
                </div>
            );
        }
        else{
            return null;
        }
        
        
    }
}
export default MapApprovPanel;

//button ????????????Dis?????????Approve??????
//node ???????????????group=1 ????????????
//????????????????????????