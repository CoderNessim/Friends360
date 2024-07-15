/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

function GroupProvider({ children }) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  return (
    <GroupContext.Provider value={{ currentGroupIndex, setCurrentGroupIndex }}>
      {children}
    </GroupContext.Provider>
  );
}

function useGroupProvider() {
  const context = useContext(GroupContext);
  if (context === undefined)
    throw new Error('GroupContext was used outside of GroupProvider');
  return context;
}

export { GroupProvider, useGroupProvider };
