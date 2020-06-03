import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ITrainingWebPartProps {
    description: string;
    lists: string;
    userAssessment: string;
    userTraining: string;
    moduleSubmittionMsg: string;
    moduleCompletionMsg: string;
    URLForYes: string;
    URLForNo: string;
}
export default class TrainingWebPart extends BaseClientSideWebPart<ITrainingWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=TrainingWebPart.d.ts.map