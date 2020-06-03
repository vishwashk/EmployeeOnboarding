import * as React from 'react';
import { ITrainingProps } from './ITrainingProps';
export interface ITrainingState {
    module: any;
    subModule: any;
    allTraining: any;
    selectedIDs: any;
    allTrainingId: any;
    selectedTrainingId: any;
    isFilterOpen: string;
    isClose: boolean;
    assessmentStatus: boolean;
    assessmentModule: any;
    assessmentParm: boolean;
    isLoading: boolean;
}
export default class Training extends React.Component<ITrainingProps, ITrainingState> {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ITrainingProps): void;
    renderTrainigModule(): void;
    private onConfigure;
    _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void;
    toggleFilters(ev: any): void;
    checkCondition(): any;
    saveDraftVersion(flag?: any): void;
    render(): React.ReactElement<ITrainingProps>;
}
//# sourceMappingURL=Training.d.ts.map