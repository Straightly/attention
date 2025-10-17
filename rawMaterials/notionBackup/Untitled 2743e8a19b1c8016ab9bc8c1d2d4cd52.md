# Untitled

demographics-icon

toggleDemographicsDrawer

```jsx
view.listenTo(GlobalEvents, "encounter-stage-switch", function() {
			if (view._isOpen) {
				view.toggleDemographicsDrawer();
			}
		});

		view.listenTo(GlobalEvents, "toggle-demographics-drawer", function() {
			view.toggleDemographicsDrawer();
		});
```