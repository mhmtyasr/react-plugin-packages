import { Button, Col, Input, Row } from "antd";
import * as React from "react";
const packageJson = require("./package.json") as any;

export const getAttributes = (): any => {
  return {
    name: packageJson.name,
    libraryName: packageJson.libraryName,
    version: packageJson.version,
  };
};

const Plugin = ({ useAuth, getContextApi }) => {
  const {missionData,handleDeleteMissionData } = React.useContext(
    getContextApi("testPluginWithProvider")
  );  

  return (
    <Row>
      <Button
        onClick={() => {
          handleDeleteMissionData();
        }}
      >
        Delete Mission
      </Button>
      {missionData.length}
    </Row>
  );
};

export default Plugin;
