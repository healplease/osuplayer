import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import JSZip from "jszip";
import Button from "react-bootstrap/Button";

import Archive from "./content/Archive";

const Upload = () => {
    const [archives, setArchives] = useState([]);

    const convertToFile = (obj) => {
        const extensionMap = {
            "jpg": "image/jpeg",
            "png": "image/png",
            "mp3": "audio/mpeg",
            "osu": "text/plain",
        };
        const extension = obj.name.split(".").pop();
        return new File([obj._data.compressedContent], obj.name, { type: extensionMap[extension] });
    };

    const getFiles = (zipFiles, extensions) => {
        return Object.keys(zipFiles)
            .filter((filename) => extensions.some((extension) => filename.endsWith(extension)))
            .map((filename) => convertToFile(zipFiles[filename]));
    };

    const handleFiles = async (event) => {
        const newFiles = [...event.target.files];
        const newFilesData = await Promise.all(newFiles.map(async (file) => {
            const zip = await JSZip.loadAsync(file);
            return {
                name: file.name,
                backgrounds: getFiles(zip.files, [".jpg", ".png"]),
                beatmaps: getFiles(zip.files, [".osu"]),
                music: getFiles(zip.files, [".mp3"]),
            };
        }));
        setArchives([...archives, ...newFilesData]);
    };

    return (
        <div className="container">
            <div className="p-3">
                <div className="d-flex justify-content-center w-100">
                    <h1>Upload</h1>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="filesinput" className="btn btn-primary btn-lg w-100">Select files</Form.Label>
                    <Form.Control
                        type="file"
                        id="filesinput"
                        multiple
                        accept=".osz"
                        style={{ display: "none" }}
                        onChange={handleFiles}
                    />
                </Form.Group>

                <ListGroup>
                    {archives.map((archive, index) => (
                        <ListGroup.Item key={index}>
                            <Archive archive={archive} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
};

export default Upload;