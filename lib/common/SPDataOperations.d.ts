import '@pnp/polyfill-ie11';
export declare class SPDataOperations {
    /**
     * Gets the available Choices in the Module Choice field
     *
     * @param lists The list for which the fields of type Managed Metadata need to be retrieved
     */
    static LOADCurrentUserTraining(lists: string, userEmail: string): Promise<any>;
    /**
   * Gets the available sub module
   *
   * @param lists The list for which the fields of type Managed Metadata need to be retrieved
   * @param module
   * @param userTrainingList
   */
    static LOADSubModuleData(lists: string, userEmail: any, userTrainingList: string): Promise<any>;
    /**
     * Check if the current user has requested permissions on a list
     *
     * @param lists The list on which user permission needs to be checked
     * @param ids The permission kind for which user needs to be authorized
     * @param itemId
     * @param pageContext
     * @param props
     * @param userAssessmentList
     */
    static UpdateTrainings(lists: string, trainingIds: any[], props: any, ModuleStatus?: any, userAssessmentList?: string): Promise<void>;
    /**
       * Gets the available Choices in the Module Choice field
       * @param lists The list for which the fields of type Managed Metadata need to be retrieved
       * @param assessmentlist
       * @param totalQuestion
       * @param userEmail
       * @param userAssessentList
       */
    static LOADCurrentUserAssessment(lists: string, assessmentlist: string, totalQuestion: any, userEmail: string, userAssessentList: string): Promise<any>;
    /**
     * Check if the current user has requested permissions on a list
     *
     * @param lists The list on which user permission needs to be checked
     * @param userEmail The permission kind for which user needs to be authorized
     */
    static GetAssessmentStatus(lists: string, userEmail: string): Promise<{
        attemptId: any;
        totalAttempt: any;
        assessmentStatus: any;
        assessmentAllData: any;
    }>;
    /**
       * Check if the current user has requested permissions on a list
       *
       * @param lists The list on which user permission needs to be checked
       * @param ids The permission kind for which user needs to be authorized
       * @param itemId
       * @param pageContext
       * @param props
       */
    static UpdateAssessmentStatus(lists: string, module: string, status: string, totalAttemptData: any, props: any, correctQuestion: number, score: number, totalQuestion: number): Promise<void>;
    static AssignModuleAssessment(lists: string, module: string, props: any): Promise<void>;
    static spLoggedInUserDetails(ctx: any): Promise<any>;
    /**
    * Check if the current user has requested permissions on a list
    * @param listId The list on which user permission needs to be checked
    */
    static getListItemEntityType(listId: string): Promise<any>;
}
//# sourceMappingURL=SPDataOperations.d.ts.map