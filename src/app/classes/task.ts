export class Task {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public createdAt: string,
    public resolutionDatePlan: string,
    public priorityName: string,
    public tags: Array<string>,
    public statusId: string,
    public statusRgb: string,
    public statusName: string,
    public initiatorName: string,
    public executorId: string,
    public executorName: string,
    public lifetimeItems: string) { }
}
