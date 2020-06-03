import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IAssessmentHomeWebPartProps {
    description: string;
    lists: string;
    assessmentList: string;
    userAssessmentList: string;
}
export default class AssessmentHomeWebPart extends BaseClientSideWebPart<IAssessmentHomeWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=AssessmentHomeWebPart.d.ts.map