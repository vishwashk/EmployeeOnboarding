import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IAssessmentWebPartProps {
    description: string;
    userTrainingList: string;
    assessmentList: string;
    totalQuestion: any;
    passingScore: any;
    userAssessmentList: string;
    URLAssessmentHome: string;
}
export default class AssessmentWebPart extends BaseClientSideWebPart<IAssessmentWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=AssessmentWebPart.d.ts.map