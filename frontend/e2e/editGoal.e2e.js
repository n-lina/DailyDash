describe("EditGoal", () => {
  it("should successfully sign in with test user", async () => {
    try {
      // try here because sometimes dev mode needs to load twice?
      await waitFor(element(by.id("welcomeMessage")))
        .toExist()
        .withTimeout(20000);
      await element(by.id("nextScreenButton")).tap();
      await element(by.id("testSignIn")).tap();
    } catch (err) {
      await waitFor(element(by.id("welcomeMessage")))
        .toExist()
        .withTimeout(20000);
      await element(by.id("nextScreenButton")).tap();
      await element(by.id("testSignIn")).tap();
    }
  });

  it("should show home screen after signing in", async () => {
    await waitFor(element(by.id("homeScreenWrap")))
      .toExist()
      .withTimeout(10000);
    await expect(element(by.id("homeScreenWrap"))).toBeVisible();
  });

  it("should navigate to goals page", async () => {
    await element(by.id("goalsTabButton")).tap();
    await expect(element(by.id("ltgWrap"))).toBeVisible();
    await expect(element(by.id("ltGoal0"))).toNotExist();
  });

  it("should go to add goals page", async () => {
    await element(by.id("newGoalButton")).tap();
    await waitFor(element(by.id("goalFormWrap")))
      .toExist()
      .withTimeout(1000);
  });

  it("should fill out form", async () => {
    await element(by.id("titleInput")).typeText("Get really strong");
    await element(by.id("descriptionInput")).typeText(
      "Can only bench press 5 lbs.. "
    );
    await element(by.id("descriptionInput")).tapReturnKey();
    await element(by.id("stgTitle0")).typeText("Go to the gym");
    await element(by.id("stgTitle0")).tapReturnKey();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await element(by.id("hourInput0")).typeText("12");
    await element(by.id("minInput0")).typeText("14");
    await element(by.id("minInput0")).tapReturnKey();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await element(by.id("newSTGButton")).tap();
    await waitFor(element(by.id("stgTitle1")))
      .toExist()
      .withTimeout(2000);
    await element(by.id("stgTitle1")).typeText("Eat some spinach");
    await element(by.id("stgTitle1")).tapReturnKey();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await element(by.id("hourInput1")).typeText("1");
    await element(by.id("minInput1")).typeText("15");
    await element(by.id("minInput1")).tapReturnKey();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await waitFor(element(by.id("submitGoalButton")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("submitGoalButton")).tap();
    await waitFor(element(by.id("ltgWrap")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("ltgWrap")).swipe("down");
  });

  it("should go to edit goal page", async () => {
    await element(by.id("ltGoal0")).tap();
    await waitFor(element(by.id("editGoalButton")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("editGoalButton")).tap();
    await waitFor(element(by.id("goalFormWrap")))
      .toExist()
      .withTimeout(1000);
  });

  it("should fill out edit goal form", async () => {
    await element(by.id("titleInput")).typeText(" and fit and healthy ");
    await element(by.id("descriptionInput")).typeText(" very sad");
    await element(by.id("descriptionInput")).tapReturnKey();
    await waitFor(element(by.id("suggestionButton")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("suggestionButton")).tap();
    await element(by.text("DISMISS")).tap();
    await waitFor(element(by.id("submitGoalButton")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("submitGoalButton")).tap();
    await waitFor(element(by.id("ltgWrap")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("ltgWrap")).swipe("down");
  });

  it("should delete goal as clean up", async () => {
    await element(by.id("goalsTabButton")).tap();
    await expect(element(by.id("ltgWrap"))).toBeVisible();
    await element(by.id("ltGoal0")).tap();
    await waitFor(element(by.id("deleteGoalButton")))
      .toExist()
      .withTimeout(1000);
    await element(by.id("deleteGoalButton")).tap();
    await element(by.text("Yes")).tap();
    await waitFor(element(by.id("ltgWrap")))
      .toExist()
      .withTimeout(1000);
    await expect(element(by.id("ltGoal0"))).toNotExist();
  });
});
