import React, { Component } from "react";
import { RiVideoUploadFill, RiUploadCloud2Line } from "react-icons/ri";
import { Button, Progress } from "antd";
import videoService from "../_services/video.service";

class Upload extends Component {
  state = {
    drag: false,
    upload: false,
    title: "Title of the video",
    description: "",
    files: {},
    progress: 0,
  };

  fileList = [];
  uploadFiles = (files) => {
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      this.fileList.push(files[i].name);
      this.setState({ upload: true });
      this.setState({ title: files[0].name, files: files[0] });
    }
  };

  dropRef = React.createRef();
  fileInput = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  handleOnclick = (e) =>{
    this.fileInput.current.click();
  }
  handleFileSelect = (e) => {
   
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.target.files && e.target.files.length > 0) {
      this.uploadFiles(e.target.files);
      // e.target.clearData();
      this.dragCounter = 0;
    }
  };
  handleDrop = (e) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.uploadFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };


  submit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    console.log(this.state);
    formData.append("video", this.state.files, this.state.files.name);

    const config = {
      onUploadProgress: (progressEvent) => {
        this.setState({
          progress: Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          ),
        });
        console.log(this.state.progress);
      },
    };
    videoService
      .addVideo(formData, config)
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
    div.addEventListener("click", this.handleOnclick);
  };

  componentWillUnmount = () => {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  };

  render() {
    return (
      <div className="flex flex-col mt-8 m-4 mx-auto w-full max-w-4xl justify-center ">
        <div className="flex justify-around mx-4 ">
          <p className="text-2xl text-gray-600 m-2">
            One Step to Publish your video!{" "}
          </p>
          <Button
            size={60}
            type="primary"
            shape="round"
            icon={<RiUploadCloud2Line />}
            className="w-48 flex justify-center items-center text-xl p-4 transform hover:scale-110 motion-reduce:transform-none"
          >
            Publish Video
          </Button>
        </div>

        <div ref={this.dropRef} class="flex justify-center my-4">
          <div class="shadow-inner border bg-white cursor-pointer border-gray-100 rounded-md w-2/3 max-w-3/4 transition duration-500 ease-in-out hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-110">
            <div class="h-64 flex flex-col justify-center items-center container mx-auto px-6 ">
              <RiVideoUploadFill class="text-5xl" />
              <p class="tracking-wider text-lg text-gray-500">
                {" "}
                Drag and Drop the video{" "}
              </p>
              <input type="file" ref={this.fileInput} onChange={this.handleFileSelect} className="hidden" />
              <button onClick={this.handleOnclick}>Upload file</button>
              {this.state.progress > 0 && (
                <Progress
                  type="circle"
                  percent={this.state.progress}
                  status="active"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          {this.state.upload && (
            <form
              onSubmit={this.submit}
              className="flex flex-col w-full items-center my-8 text-xl text-gray-500"
            >
              <label className="flex items-baseline w-3/4">
                Title
                <input
                  className="border p-2 m-2 w-full rounded-xl focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-green-700"
                  type="text"
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({ title: e.target.value });
                  }}
                />
              </label>

              <label className="flex items-baseline w-3/4">
                Description
                <textarea
                  className="border w-full p-1 m-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-green-700"
                  type="text"
                  value={this.state.description}
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                ></textarea>
              </label>

              <Button
                size={60}
                type="primary"
                shape="round"
                icon={<RiUploadCloud2Line />}
                className="w-64 my-4 flex justify-center items-center text-xl p-4 transform hover:scale-110 motion-reduce:transform-none"
              >
                Publish Video
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Upload;
