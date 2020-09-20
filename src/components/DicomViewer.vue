<template>
  <div class="dicom-viewer">
    <div class="tools-menu">
    
      <el-checkbox v-model="isPrediction" label="Предсказание" border class="mr-1"></el-checkbox>
      <el-radio-group v-model="selectedTool" @change="onChangeTool">
        <el-radio-button
          v-for="tool in Object.keys(tools)"
          :label="tool"
          :key="tool"
          >{{ tool }}</el-radio-button
        >
      </el-radio-group>
      <el-button
        style="margin-top: -10px;"
        @click="onReset"
        type="warning"
        class="ml-2"
        >Reset</el-button
      >
    </div>
    <div id="dwv">
      <div class="layerContainer">
        <canvas class="imageLayer"></canvas>
        <div class="drawDiv"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dwv from 'dwv';
import { fbApp } from '../main';
import Vue from 'vue';

// gui overrides

// get element
dwv.gui.getElement = dwv.gui.base.getElement;

// Image decoders (for web workers)
dwv.image.decoderScripts = {
  jpeg2000: 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
  'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
  'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js',
  rle: 'assets/dwv/decoders/dwv/decode-rle.js',
};

export default {
  name: 'Upload',
  data() {
    return {
      versions: {
        dwv: dwv.getVersion(),
        vue: Vue.version,
      },
      dwvApp: null,
      tools: {
        Scroll: {},
        ZoomAndPan: {},
        WindowLevel: {},
        Draw: {
          options: ['Ruler'],
          type: 'factory',
          events: ['draw-create', 'draw-change', 'draw-move', 'draw-delete'],
        },
      },
      selectedTool: [],
      loadProgress: 0,
      dataLoaded: false,
      metaData: null,
      showDicomTags: false,
      dropboxClassName: 'dropBox',
      borderClassName: 'dropBoxBorder',
      hoverClassName: 'hover',
      isPrediction: false
    };
  },
  mounted() {
    // create app
    this.dwvApp = new dwv.App();
    // initialise app
    this.dwvApp.init({
      containerDivId: 'dwv',
      tools: this.tools,
    });
    this.dwvApp.loadURLs([
      'https://firebasestorage.googleapis.com/v0/b/digiathero---med.appspot.com/o/xray.png?alt=media&token=d23dfa66-c182-4908-876f-f178b9d90c48',
      //   'https://firebasestorage.googleapis.com/v0/b/digiathero---med.appspot.com/o/bbmri-53323851.dcm?alt=media&token=e8b90032-d1f8-405d-8e8b-c4a5fd747ad0',
    ]);
  },
  methods: {
    clickUpload() {
      document.getElementById('file-input').click();
    },
    handleSelectFiles(event) {
      event.stopPropagation();
      event.preventDefault();
      // load files
      this.dwvApp.loadFiles(event.target.files);
      // hide drop box
      this.hideDropbox();
    },
    onChangeTool: function(tool) {
      //   this.selectedTool = tool;
      this.dwvApp.setTool(tool);
      if (tool === 'Draw') {
        this.onChangeShape(this.tools.Draw.options[0]);
      }
    },
    onChangeShape: function(shape) {
      if (this.dwvApp && this.selectedTool === 'Draw') {
        this.dwvApp.setDrawShape(shape);
      }
    },
    onReset: function() {
      this.dwvApp.restoreOriginalImage();
      //   this.dwvApp.resetLayout();
    },
    setupDropbox() {
      // start listening to drag events on the layer container
      const layerContainer = this.dwvApp.getElement('layerContainer');
      if (layerContainer) {
        layerContainer.addEventListener('dragover', this.onDragOver);
        layerContainer.addEventListener('dragleave', this.onDragLeave);
        layerContainer.addEventListener('drop', this.onDrop);
      }
      // set the initial drop box size
      const box = this.dwvApp.getElement(this.dropboxClassName);
      if (box) {
        const size = this.dwvApp.getLayerContainerSize();
        const dropBoxSize = (2 * size.height) / 3;
        box.setAttribute(
          'style',
          'width:' + dropBoxSize + 'px;height:' + dropBoxSize + 'px'
        );
      }
    },
    onDragOver: function(event) {
      // prevent default handling
      event.stopPropagation();
      event.preventDefault();
      // update box border
      const box = this.dwvApp.getElement(this.borderClassName);
      if (box && box.className.indexOf(this.hoverClassName) === -1) {
        box.className += ' ' + this.hoverClassName;
      }
    },
    onDragLeave: function(event) {
      // prevent default handling
      event.stopPropagation();
      event.preventDefault();
      // update box class
      const box = this.dwvApp.getElement(this.borderClassName + ' hover');
      if (box && box.className.indexOf(this.hoverClassName) !== -1) {
        box.className = box.className.replace(' ' + this.hoverClassName, '');
      }
    },
    hideDropbox: function() {
      // remove box
      const box = this.dwvApp.getElement(this.dropboxClassName);
      if (box) {
        box.parentNode.removeChild(box);
      }
    },
    onDrop: function(event) {
      // prevent default handling
      event.stopPropagation();
      event.preventDefault();
      // load files
      this.dwvApp.loadFiles(event.dataTransfer.files);
      // hide drop box
      this.hideDropbox();
    },
    loadFiles(files) {
      this.dwvApp.loadFiles(files);
    },
    downloadFile() {
      var storage = fbApp.storage();
      var storageRef = storage.ref();
      storageRef
        .child('dicom.dcm')
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          // This can be downloaded directly:
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          //   console.log(xhr);
          this.loadFiles([blob]);
          //   // Or inserted into an <img> element:
          //   var img = document.getElementById('myimg');
          //   img.src = url;
        })
        .catch(function(error) {
          // Handle any errors
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.upload {
  display: flex;
  justify-content: center;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  padding: 0 20px;
  box-sizing: border-box;
  height: calc(100vh - 140px);
}

#dwv {
  font-family: Arial, Helvetica, sans-serif;
  height: 90%;
  width: 100%;
}

.button-row {
  text-align: center;
  padding: 5px;
}

#dwv button {
  margin: 2px;
}

/* Layers */
.layerContainer {
  position: relative;
  padding: 0;
  margin: auto;
  text-align: center;
}
.imageLayer {
  position: absolute;
  left: 0px;
}
.drawDiv {
  position: absolute;
  pointer-events: none;
}

/* drag&drop */
.dropBox {
  border: 5px dashed rgba(68, 138, 255, 0.38);
  margin: auto;
  text-align: center;
  vertical-align: middle;
}
.dropBox.hover {
  border: 5px dashed var(--md-theme-default-primary);
}

.md-dialog {
  width: 80%;
  height: 90%;
}

.el-radio-group {
  display: block;
  //   padding-bottom: 25px;
}

.tools-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
}

.tools {
  display: flex;
  flex-direction: column;
  .el-button {
    margin-left: 0 !important;
    padding: 10px;
  }
}

.dicom-viewer {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  line-height: normal;
  height: calc(100vh - 120px);
}
</style>
