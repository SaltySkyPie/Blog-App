import { v4 as uuidv4 } from 'uuid'

export class RandomGenerator {
  static uuid(): string {
    return uuidv4()
  }
}
