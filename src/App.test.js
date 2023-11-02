import { render, screen } from '@testing-library/react';
import App from './App';

test('renders VTube Studio app', async () => {
  render(<App />);

  // 在这里可以添加适当的等待条件来等待应用程序加载完成，例如：
  // await waitFor(() => {
  //   expect(screen.getByText('Model Loaded: No')).toBeInTheDocument();
  // });

  // 以下是示例测试 VTube Studio 的一些状态变化
  expect(screen.getByText('Model Loaded: No')).toBeInTheDocument();

  // 这只是示例，请根据你的实际应用程序状态和交互进行更改
});