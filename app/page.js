"use client";
import BaseLayout from "../components/BaseLayout";
import { useSelector } from "react-redux";

export default function Home() {
  const actualtasks = useSelector((state) => state.InputData.data);
  const completedtasks = useSelector((state) => state.InputData.completedTasks);

  const highPriorityTasks = actualtasks.filter(
    (task) => task.priority === "High"
  );
  const mediumPriorityTasks = actualtasks.filter(
    (task) => task.priority === "Medium"
  );
  const lowPriorityTasks = actualtasks.filter(
    (task) => task.priority === "Low"
  );
  const nonPriorityTasks = actualtasks.filter(
    (task) => task.priority === "None"
  );

  const totalTasks = actualtasks.length;
  const highPriorityProgress = (highPriorityTasks.length / totalTasks) * 100;
  const mediumPriorityProgress =
    (mediumPriorityTasks.length / totalTasks) * 100;
  const lowPriorityProgress = (lowPriorityTasks.length / totalTasks) * 100;
  const nonPriorityProgress = (nonPriorityTasks.length / totalTasks) * 100;

  const progressValue = completedtasks.length;
  const intotalTasks = actualtasks.length;

  return (
    <BaseLayout>
      <div className="container mx-auto p-4 flex flex-row">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Total Tasks vs Completed Tasks(%100)
          </h2>
          <progress
            className="progress progress-accent w-72"
            value={progressValue}
            max={intotalTasks}
          ></progress>
        </div>
        <div className="flex flex-col items-center ml-12">
          <h2 className="text-2xl font-bold mb-4">
            Pending Tasks Based on Priority (%100)
          </h2>
          <div className="grid gap-4">
            <div className="card w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium">High Priority:</p>
                <progress
                  className="progress progress-accent w-48"
                  value={highPriorityProgress}
                  max={100}
                ></progress>
              </div>
            </div>
            <div className="card w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium">Medium Priority:</p>
                <progress
                  className="progress progress-accent w-48"
                  value={mediumPriorityProgress}
                  max={100}
                ></progress>
              </div>
            </div>
            <div className="card w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium">Low Priority:</p>
                <progress
                  className="progress progress-accent w-48"
                  value={lowPriorityProgress}
                  max={100}
                ></progress>
              </div>
            </div>
            <div className="card w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium">Non-Priority:</p>
                <progress
                  className="progress progress-accent w-48"
                  value={nonPriorityProgress}
                  max={100}
                ></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
