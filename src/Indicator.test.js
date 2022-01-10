import { render } from '@testing-library/react';
import Indicator from './Indicator';

test('renders pie chart', () => {
    const { container } = render(<Indicator />);
    const pieSectors = container.getElementsByClassName('recharts-pie-sector');//container.getElementsByTagName('path');
    expect(pieSectors.length).toBe(2);
});

test('renders values', () => {
    const { container } = render(<Indicator />);
    const tableValues = container.getElementsByClassName('tableValue');
    const tableValuesCount = tableValues.length;
    expect(tableValuesCount).toBe(4);
    var tableSum = 0;
    for (var i = 0; i < tableValuesCount; i++) {
        tableSum += parseInt(tableValues[i].innerHTML);
    }
    var calculatedAverage = tableSum / 4;
    const renderedAverage = parseInt(container.getElementsByClassName('pieLabel')[0].innerHTML);
    expect(renderedAverage).toBe(calculatedAverage);
});