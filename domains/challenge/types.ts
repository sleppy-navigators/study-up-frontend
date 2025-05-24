/**
 * Challenge domain types
 */

export interface Task {
  id?: number;
  title: string;
  deadline: Date;
}

export interface Challenge {
  id?: number;
  title: string;
  deadline: Date;
  description?: string;
  tasks: Task[];
}

export interface CreateChallengeFormData {
  title: string;
  deadline: Date;
  description?: string;
  tasks: {
    title: string;
    deadline: Date;
  }[];
}
