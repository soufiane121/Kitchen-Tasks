class AddTasksToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :tasksId, :jsonb, array:true, default: []
  end
end
