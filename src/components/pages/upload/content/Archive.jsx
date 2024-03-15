import { Button, Badge } from "react-bootstrap";

const Archive = ({ archive }) => {
    const reader = new FileReader();
    const { backgrounds, beatmaps, music } = archive;
    
    /**
    * @param {File} beatmapFile
    * @returns {Promise<string>}
    */
    const parseBeatmap = async (beatmapFile) => {
        const beatmap = reader.readAsText(beatmapFile, "UTF-8");
        console.log(beatmap);
        const lines = beatmap.split("\n");
        const title = lines.find((line) => line.startsWith("Title:"));
        const artist = lines.find((line) => line.startsWith("Artist:"));
        const version = lines.find((line) => line.startsWith("Version:"));
        console.log(`${title} - ${artist} (${version})`);
        return `${title} - ${artist} (${version})`;
    };

    return (
        <div className="d-flex justify-content-between">
            <div className="w-100">
                <h4>{archive.name}</h4><hr></hr>
                <h5>
                <span className="me-2">Backgrounds</span>
                    <Badge bg="secondary">{backgrounds.length}</Badge>
                </h5>
                {
                    backgrounds.length > 0 && backgrounds.map((background, index) => (
                        <div key={index}>
                            <span className="me-2">{background.name}</span>
                            <Badge bg="info">{background.size} bytes</Badge>
                            <div>
                                <img src={URL.createObjectURL(background)} alt={background.name} />
                            </div>
                        </div>
                    ))
                }
                <h5>
                    <span className="me-2">Beatmaps</span>
                    <Badge bg="secondary">{beatmaps.length}</Badge>
                </h5>
                {
                    beatmaps.length > 0 && beatmaps.map((beatmap, index) => (
                        <div key={index}>
                            <span className="me-2">{beatmap.name}</span>
                            <Badge bg="info" className="me-2">{beatmap.size} bytes</Badge>
                            <Button variant="info" size="sm" onClick={() => parseBeatmap(beatmap)}>Show</Button>
                        </div>
                    ))
                }
                <h5>
                    <span className="me-2">Music</span>
                    <Badge bg="secondary">{music.length}</Badge>
                </h5>
                {
                    music.length > 0 && music.map((music, index) => (
                        <div key={index}>
                            <span className="me-2">{music.name}</span>
                            <Badge bg="info">{music.size} bytes</Badge>
                            <div>
                                <audio controls src={URL.createObjectURL(music)} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Archive;