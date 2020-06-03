import * as React from 'react';
import { IAssessmentHomeProps } from './IAssessmentHomeProps';
export interface IAssessmentHomeState {
    moduleAssessment: any[];
    assessmentStatus: string;
}
export default class AssessmentHome extends React.Component<IAssessmentHomeProps, IAssessmentHomeState> {
    constructor(props: any);
    componentDidMount(): void;
    render(): React.ReactElement<IAssessmentHomeProps>;
}
//# sourceMappingURL=AssessmentHome.d.ts.map