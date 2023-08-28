import * as React from "react";

export interface TestContextType {
  missionData: any;
  setMissionData: (param: any) => void;
}

export let TestContext = React.createContext<TestContextType>(null!);

function TestProvider({ children }: { children: React.ReactNode }) {
  const [missionData, setMissionData] = React.useState<[]>([]);

  const handleAddMissionData = (param: any) => {
    setMissionData([...missionData, param]);
  };

  const handleDeleteMissionData = (param: any) => {
    let temp = [...missionData];

    temp.splice(param, 1);

    setMissionData(temp);
  };

  let value = { missionData, handleDeleteMissionData, handleAddMissionData };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

export default TestProvider;
