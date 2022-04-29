export interface Table{
    id: string,
    name: string,
    voting: string,
    userOwerId: number,
    issues: string[],
    isShowCardByOwner: boolean
}