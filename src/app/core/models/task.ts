
export class Task {
    id: string;
    idUser: string;
    description: string;
    creationDate: Date;
    isCompleted: boolean;
}

export class AddTaskRequest{
    idUser: string;
    description: string;
}

export class UpdateTaskRequest{
    idTask: string;
    isCompleted: boolean;
}