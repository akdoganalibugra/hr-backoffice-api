import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, Customer } from '@prisma/client';

type CustomerResponse = Omit<Customer, 'connectionString'>;

@Injectable()
export class CustomersService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: Prisma.CustomerCreateInput): Promise<CustomerResponse> {
    const existingCustomer = await this.db.customer.findUnique({
      where: { email: data.email },
    });

    if (existingCustomer) {
      throw new ConflictException('Bu email ile kayıtlı müşteri zaten mevcut');
    }

    const customer = await this.db.customer.create({ data });

    return customer;
  }

  async findAll(): Promise<CustomerResponse[]> {
    const customers = await this.db.customer.findMany();
    return customers;
  }

  async findOne(id: string): Promise<CustomerResponse> {
    const customer = await this.db.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Müşteri bulunamadı');
    }

    return customer;
  }

  async update(
    id: string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<CustomerResponse> {
    const existingCustomer = await this.db.customer.findUnique({
      where: { id },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Müşteri bulunamadı');
    }

    if (data.email && data.email !== existingCustomer.email) {
      const emailExists = await this.db.customer.findUnique({
        where: { email: data.email as string },
      });

      if (emailExists) {
        throw new ConflictException(
          'Bu email ile kayıtlı müşteri zaten mevcut',
        );
      }
    }

    const updatedCustomer = await this.db.customer.update({
      where: { id },
      data,
    });

    return updatedCustomer;
  }

  async remove(id: string): Promise<{ message: string }> {
    const customer = await this.db.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Müşteri bulunamadı');
    }

    await this.db.customer.delete({
      where: { id },
    });

    return { message: 'Müşteri başarıyla silindi' };
  }

  async testConnection(id: string): Promise<{
    success: boolean;
    message: string;
    details?: {
      host: string;
      database: string;
      port: number;
    };
  }> {
    const customer = await this.db.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Müşteri bulunamadı');
    }

    try {
      const connectionUrl = new URL(customer.connectionString);

      return {
        success: true,
        message: 'Bağlantı bilgileri geçerli görünüyor',
        details: {
          host: connectionUrl.hostname,
          database: connectionUrl.pathname.slice(1), // Remove leading '/'
          port: parseInt(connectionUrl.port) || 5432,
        },
      };
    } catch {
      return {
        success: false,
        message: 'Geçersiz bağlantı bilgileri',
      };
    }
  }

  async getConnectionString(customerId: string): Promise<string> {
    const customer = await this.db.customer.findUnique({
      where: { id: customerId },
      select: { connectionString: true, status: true },
    });

    if (!customer) {
      throw new NotFoundException('Müşteri bulunamadı');
    }

    if (customer.status !== 'ACTIVE') {
      throw new BadRequestException('Müşteri aktif değil');
    }

    return customer.connectionString;
  }
}
