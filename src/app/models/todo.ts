export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type TodosFilter = 'ALL' | 'ACTIVE' | 'COMPLETED';
