import * as React from 'react';
import { IAssessmentProps } from './IAssessmentProps';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
export interface IAssessmentState {
    module: any;
    moduleAssessment: any[];
    userAnswer: any;
    correctAnswer: any;
    totalAttemptData: any;
    assessmentModule: any;
    isOpenPromt: boolean;
    assessmentStatus: string;
    assessmentParm: boolean;
}
export default class Assessment extends React.Component<IAssessmentProps, IAssessmentState> {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IAssessmentProps): void;
    renderAssessmentModule(): void;
    private onConfigure;
    _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void;
    submittedAssessment(): void;
    render(): React.ReactElement<IAssessmentProps>;
}
//# sourceMappingURL=Assessment.d.ts.map