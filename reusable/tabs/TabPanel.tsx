type TabPanelProps = {
  children: JSX.Element;
  index: number;
  value: number;
};

export const TabPanel = ({ index, value, children }: TabPanelProps): JSX.Element | null =>
  value === index ? children : null;
