"use client";

import React, { useState } from "react";
import type { UploadProps } from "antd";
import { message, Upload, Button, Modal } from "antd";
import { downloadData } from "../utils/data";
import ReactJson from "@microlink/react-json-view";

enum FileStatus {
  Uploading = "uploading",
  Done = "done",
  Error = "error",
}

export const DocumentParser = () => {
  const [isReady, setReady] = useState(true);
  const [currentJson, setCurrentJson] = useState(null);

  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: false,
    disabled: !isReady,
    action: "api/parse",
    onChange({ file }) {
      const { status } = file;
      if (status === FileStatus.Uploading && isReady) {
        setReady(false);
        message.destroy();
        message.loading("Parsing file...", 0);
      }
      if (status === FileStatus.Done) {
        setReady(true);
        message.destroy();
        message.success(
          `${file.name} file parsed successfully. Click item to view response.`
        );
        downloadData({ fileName: file.name, data: file.response });
      } else if (status === FileStatus.Error) {
        setReady(true);
        message.destroy();
        const errorMessage =
          file.response[0]?.message || "File parsing failed.";
        message.error(errorMessage);
      }
    },
    onPreview({ response }) {
      setCurrentJson(response);
    },
  };

  return (
    <div>
      <Dragger {...props}>
        <p className="text-xl font-semibold mb-2">
          Click or drag file to this area to upload
        </p>
        <p className="max-w-[50ch] text-sm opacity-50 mb-5">
          Only <code>.txt</code> formats and single file upload. Strictly
          prohibited from uploading sensitive data or other banned files.
        </p>
        <Button disabled={!isReady}>Click to Upload</Button>
      </Dragger>

      <Modal
        title="AI JSON Response"
        open={!!currentJson}
        onOk={() => setCurrentJson(null)}
        onCancel={() => setCurrentJson(null)}
      >
        {currentJson && <ReactJson src={currentJson} />}
      </Modal>
    </div>
  );
};
