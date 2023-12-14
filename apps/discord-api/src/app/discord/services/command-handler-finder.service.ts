import { Injectable } from '@nestjs/common'
import { MetadataScanner } from '@nestjs/core'
import { filter, firstValueFrom, from, map, throwIfEmpty } from 'rxjs'

import { ReflectMetadataProvider } from '../providers/reflect-metadata.provider'

@Injectable()
export class CommandHandlerFinderService {
  constructor(
    private readonly metadataScanner: MetadataScanner,
    private readonly reflectMetadataProvider: ReflectMetadataProvider
  ) {}

  async searchHandler(instance: InstanceType<any>): Promise<string> {
    const methodNames = new Set(this.getMethodsFromInstance(instance))

    if (methodNames.size === 0)
      throw new Error(
        `Command handler not found in class ${instance.constructor.name}`
      )

    const handlerData = await firstValueFrom(
      from(methodNames).pipe(
        map((methodName) => ({
          metadata: this.reflectMetadataProvider.getHandlerDecoratorMetadata(
            instance,
            methodName
          ),
          methodName,
        })),
        filter(({ metadata }) => !!metadata),
        throwIfEmpty(
          () =>
            new Error(
              `Command handler not found in class ${instance.constructor.name}`
            )
        )
      )
    )

    return handlerData.methodName
  }

  private getMethodsFromInstance(instance: InstanceType<any>) {
    if (typeof this.metadataScanner.getAllMethodNames === 'function') {
      return this.metadataScanner.getAllMethodNames(
        Object.getPrototypeOf(instance)
      )
    }

    // TODO: Remove later deprecated method
    return this.metadataScanner.getAllFilteredMethodNames(
      Object.getPrototypeOf(instance)
    )
  }
}
