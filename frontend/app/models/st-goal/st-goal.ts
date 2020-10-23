import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const StGoalModel = types
  .model("StGoal")
  .props({
    id: types.string,
    monday: types.integer,
    tuesday: types.integer,
    wednesday: types.integer,
    thursday: types.integer,
    friday: types.integer,
    saturday: types.integer,
    sunday: types.integer,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type StGoalType = Instance<typeof StGoalModel>
export interface StGoal extends StGoalType {}
type StGoalSnapshotType = SnapshotOut<typeof StGoalModel>
export interface StGoalSnapshot extends StGoalSnapshotType {}