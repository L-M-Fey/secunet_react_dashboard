import { render } from '@testing-library/react';
import Anomalies from './Anomalies';

test('renders Anomalies lines', () => {
    const { container } = render(<Anomalies />);
    const anomaliesLines = container.getElementsByTagName('path');
    expect(anomaliesLines.length).toBeGreaterThanOrEqual(2);
});