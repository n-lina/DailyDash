import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GoalModel } from "../goal/goal"
import { StGoal } from "../st-goal/st-goal"
import { withEnvironment } from "../extensions/with-environment";
/**
 * Model description here for TypeScript hints.
 */
export const GoalsStoreModel = types
  .model("GoalsStore")
  .props({
    goals: types.optional(types.array(GoalModel), []),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setLTgoals: (LTgoalsList) => {
      if (LTgoalsList){
        __DEV__ && console.log("Setting LTgoals list " + LTgoalsList.toString())
        self.goals = LTgoalsList;
      }
      else
      __DEV__ && console.log("Unsetting LTgoals list")
    }
  })).actions(self => ({
    getAllGoals: () => {
      return self.environment.api.getAllGoals().then(res => {
        if (res.kind == "ok" ) {
          self.setLTgoals(res.LTgoals);
          __DEV__ && console.log("Got list of LT goals")
        } else {
          __DEV__ && console.log(res.kind);
        }
      }).catch(err => {
        __DEV__ && console.error(err);
      })
    },

    postLTgoal: (LTgoal: string, STgoals: Array<StGoal>, id: string) => {
      self.environment.api.postLTgoal(LTgoal, STgoals, new Date(), id).then(res => {
        if (res.kind == "ok"){
          self.goals.push(res.goal);
          __DEV__ && console.log("Added goal to list of LT goals")
        } else {
          __DEV__ && console.log(res.kind);
        }
      }).catch(err => {
        __DEV__ && console.error(err);
      })
    },

    getOneLTgoal: (goal_id: string) => {
      // self.environment.api.getOneLTgoal(goal_id).then(res => {
      //   if (res.kind == "ok"){
      //     // how to display?
      //     __DEV__ && console.log("Got one LT goal")
      //   } else {
      //     __DEV__ && console.log(res.kind);
      //   }
      // }).catch(err => {
      //   __DEV__ && console.error(err);
      // })
      return self.goals.filter(goal => {
        return goal.id == goal_id
      })[0] 
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type GoalsStoreType = Instance<typeof GoalsStoreModel>
export interface GoalsStore extends GoalsStoreType {}
type GoalsStoreSnapshotType = SnapshotOut<typeof GoalsStoreModel>
export interface GoalsStoreSnapshot extends GoalsStoreSnapshotType {}