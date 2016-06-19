/**
 * D3 Angular Octopus core Factory
 *
 * @param {type} angular
 * @author Jose Figueruela <jfigueruela@gmail.com>
 * @since v0.0.1 20160617
 */

(function () {
  define([
    './go.module'
  ], function (moduleName) {
    'use strict';
    angular.module(moduleName).factory('GoFactory', GoFactory);
    /* @ngInject */
    function GoFactory() {

      var factory = this;
      var myDiagram;
      factory.className = '[GoFactory]';
      factory.init = init;
      factory.load = load;
      factory.exportWorkFlow = exportWorkFlow;
      factory.renderTransactionInWorkFlow = renderTransactionInWorkFlow;
      factory.tikaTest = tikaTest;
      function init(containerId) {

        if (window.goSamples)
          goSamples(); // init for these samples -- you don't need to call this
        var $ = go.GraphObject.make; // for conciseness in defining templates
        myDiagram =
          $(go.Diagram, containerId, // must name or refer to the DIV HTML element
            {
              initialContentAlignment: go.Spot.Center,
              allowDrop: true, // must be true to accept drops from the Palette
              "LinkDrawn": showLinkLabel, // this DiagramEvent listener is defined below
              "LinkRelinked": showLinkLabel,
              "animationManager.duration": 500, // slightly longer than default (600ms) animation
              "undoManager.isEnabled": true  // enable undo & redo
            });
        // when the document is modified, add a "*" to the title and enable the "Save" button
        myDiagram.addDiagramListener("Modified", function (e) {
          var button = document.getElementById("SaveButton");
          if (button)
            button.disabled =
              !myDiagram.isModified;
          var idx = document.title.indexOf("*");
          if (myDiagram.isModified) {
            if (idx < 0)
              document.title +=
                "*";
          } else {
            if (idx >= 0)
              document.title =
                document.title.substr(
                  0,
                  idx);
          }
        });
        // helper definitions for node templates

        function nodeStyle() {
          return [
            // The Node.location comes from the "loc" property of the node data,
            // converted by the Point.parse static method.
            // If the Node.location is changed, it updates the "loc" property of the node data,
            // converting back using the Point.stringify static method.
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
              // the Node.location is at the center of each node
              locationSpot: go.Spot.Center,
              //isShadowed: true,
              //shadowColor: "#888",
              // handle mouse enter/leave events to show/hide the ports
              mouseEnter: function (e, obj) {
                showPorts(
                  obj.part,
                  true);
              },
              mouseLeave: function (e, obj) {
                showPorts(
                  obj.part,
                  false);
              }
            }
          ];
        }

        // Define a function for creating a "port" that is normally transparent.
        // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
        // and where the port is positioned on the node, and the boolean "output" and "input" arguments
        // control whether the user can draw links from or to the port.
        function makePort(name, spot, output, input) {
          // the port is basically just a small circle that has a white stroke when it is made visible
          return $(go.Shape, "Square",
            {
              fill: "transparent",
              stroke: null, // this is changed to "white" in the showPorts function
              desiredSize: new go.Size(8, 8),
              alignment: spot, alignmentFocus: spot, // align the port on the main Shape
              portId: name, // declare this object to be a "port"
              fromSpot: spot, toSpot: spot, // declare where links may connect at this port
              fromLinkable: output, toLinkable: input, // declare whether the user may draw links to/from here
              cursor: "pointer"  // show a different cursor to indicate potential link point
            });
        }

        // define the Node templates for regular nodes

        var lightText = 'whitesmoke';
        myDiagram.nodeTemplateMap.add("", // the default category
          $(go.Node, "Spot", nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            $(go.Panel, "Auto",
              $(go.Shape, "Rectangle",
                {fill: "#00A9C9", stroke: null},
              new go.Binding("figure", "figure")),
              $(go.TextBlock,
                {
                  font: "bold 11pt Helvetica, Arial, sans-serif",
                  stroke: lightText,
                  margin: 8,
                  maxSize: new go.Size(160, NaN),
                  wrap: go.TextBlock.WrapFit,
                  editable: true
                },
              new go.Binding("text").makeTwoWay())
              ),
            // four named ports, one on each side:
            makePort("T", go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, false)
            ));
        myDiagram.nodeTemplateMap.add("Start",
          $(go.Node, "Spot", nodeStyle(),
            $(go.Panel, "Auto",
              $(go.Shape, "Circle",
                {minSize: new go.Size(40, 40), fill: "#79C900", stroke: null}),
              $(go.TextBlock, "Start",
                {font: "bold 11pt Helvetica, Arial, sans-serif", stroke: lightText},
              new go.Binding("text"))
              ),
            // three named ports, one on each side except the top, all output only:
            makePort("L", go.Spot.Left, true, false),
            makePort("R", go.Spot.Right, true, false),
            makePort("B", go.Spot.Bottom, true, false)
            ));
        myDiagram.nodeTemplateMap.add("End",
          $(go.Node, "Spot", nodeStyle(),
            $(go.Panel, "Auto",
              $(go.Shape, "Circle",
                {minSize: new go.Size(40, 40), fill: "#DC3C00", stroke: null}),
              $(go.TextBlock, "End",
                {font: "bold 11pt Helvetica, Arial, sans-serif", stroke: lightText},
              new go.Binding("text"))
              ),
            // three named ports, one on each side except the bottom, all input only:
            makePort("T", go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, false, true),
            makePort("R", go.Spot.Right, false, true)
            ));
        myDiagram.nodeTemplateMap.add("Comment",
          $(go.Node, "Auto", nodeStyle(),
            $(go.Shape, "File",
              {fill: "#EFFAB4", stroke: null}),
            $(go.TextBlock,
              {
                margin: 5,
                maxSize: new go.Size(200, NaN),
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true,
                font: "bold 12pt Helvetica, Arial, sans-serif",
                stroke: '#454545'
              },
            new go.Binding("text").makeTwoWay())
            // no ports, because no links are allowed to connect with a comment
            ));
        // replace the default Link template in the linkTemplateMap
        myDiagram.linkTemplate =
          $(go.Link, // the whole link panel
            {
              routing: go.Link.AvoidsNodes,
              curve: go.Link.JumpOver,
              corner: 5, toShortLength: 4,
              relinkableFrom: true,
              relinkableTo: true,
              reshapable: true,
              resegmentable: true,
              // mouse-overs subtly highlight links:
              mouseEnter: function (e, link) {
                link.findObject(
                  "HIGHLIGHT").stroke =
                  "rgba(30,144,255,0.2)";
              },
              mouseLeave: function (e, link) {
                link.findObject(
                  "HIGHLIGHT").stroke =
                  "transparent";
              }
            },
          new go.Binding("points").makeTwoWay(),
            $(go.Shape, // the highlight shape, normally transparent
              {isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT"}),
            $(go.Shape, // the link path shape
              {isPanelMain: true, stroke: "gray", strokeWidth: 2}),
            $(go.Shape, // the arrowhead
              {toArrow: "standard", stroke: null, fill: "gray"}),
            $(go.Panel, "Auto", // the link label, normally not visible
              {visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
            new go.Binding("visible", "visible").makeTwoWay(),
              $(go.Shape, "RoundedRectangle", // the label shape
                {fill: "#F8F8F8", stroke: null}),
              $(go.TextBlock, "Yes", // the label
                {
                  textAlign: "center",
                  font: "10pt helvetica, arial, sans-serif",
                  stroke: "#333333",
                  editable: true
                },
              new go.Binding("text").makeTwoWay())
              )
            );
        // Make link labels visible if coming out of a "conditional" node.
        // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
        function showLinkLabel(e) {
          var label = e.subject.findObject("LABEL");
          if (label !== null)
            label.visible =
              (e.subject.fromNode.data.figure
                === "Diamond");
        }

        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
        myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
//        load();  // load an initial diagram from some JSON text

        // initialize the Palette that is on the left side of the page
        $(go.Palette, "myPaletteDiv", // must name or refer to the DIV HTML element
          {
            "animationManager.duration": 500, // slightly longer than default (600ms) animation
            nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
            model: new go.GraphLinksModel([// specify the contents of the Palette
              {category: "Start", text: "Start"},
              {text: "Step"},
              {text: "???", figure: "Diamond"},
              {category: "End", text: "End"},
              {category: "Comment", text: "Comment"}
            ])
          });
      }
      function load(inputJSONData) {
        var parsedJSONInputData = parseJSON(inputJSONData);
        myDiagram.model = go.Model.fromJson(parsedJSONInputData);
      }

      function exportWorkFlow() {
        return myDiagram.model.toJson();
      }

      function renderTransactionInWorkFlow(transaction) {
        angular.forEach(transaction.steps, function (step) {
          for (var it = myDiagram.nodes.iterator; it.next(); ) {
            var node = it.value;
            if (step.toLowerCase() === node.data.text.toLowerCase()) {
              console.log(node)
              console.log("************************************")

              var nodeLinks = myDiagram.findLinksByExample(node);
              console.log(nodeLinks)
              console.log("-----------------------")
//              myDiagram.startTransaction("select path");
//              var links = node.findLinksConnected();
//              while (links.next())
//              {
//                links.value.path.stroke = "lightblue";
//              }
//              myDiagram.commitTransaction("select path");

            }

          }
        });

      }
      function tikaTest() {
//        // all model changes should happen in a transaction
//        myDiagram.startTransaction("shift node");
//        var data = myDiagram.model.nodeDataArray[0];  // get the first node data
//        var node = myDiagram.findNodeForData(data);   // find the corresponding Node
//        var p = node.location.copy();  // make a copy of the location, a Point
//        p.x += 10;
//        if (p.x > 200)
//          p.x = 0;
//        // changing the Node.location also changes the data.loc property due to TwoWay binding
//        node.location = p;
//
//        //        node.setProperties({
//        //          background: "red",
//        //        });
//        myDiagram.model.setDataProperty(data, "highlight", !data.highlight);
//        // show the updated location held by the "loc" property of the node data
//        myDiagram.commitTransaction("shift node");
//        myDiagram.select(myDiagram.findLinkForData(myDiagram.model.linkDataArray[0]));


//        for (var it = myDiagram.nodes.iterator; it.next(); ) {
//          var part = it.value; // part is now a Node or a Group or a Link or maybe a simple Part
//          if (part instanceof go.Node) {
//            myDiagram.select(part)
//            myDiagram.select(myDiagram.findLinkForData(part));
//          }
//          else if (part instanceof go.Link) {
//
//          }
//        }

        console.log(myDiagram.nodes.lentgh)
      }

      // Make all ports on a node visible when the mouse is over the node
      function showPorts(node, show) {
        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink)
          return;
        node.ports.each(function (port) {
          port.stroke = (show ? "white" : null);
        });
      }

      /**
       * Adapt intput JSON workflow to GoJS data format.
       * @returns {undefined}
       */
      function parseJSON(inputData) {
        //TODO: @jfigueruela: Here in future parse backend input workflow object to GoJS workflow model object.
        return inputData;
      }
      return factory;
    }
  });
})();
