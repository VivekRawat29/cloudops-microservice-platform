output "instance_id" {
  value = aws_instance.cloudops_ec2.id
}

output "public_ip" {
  value = aws_instance.cloudops_ec2.public_ip
}

output "vpc_id" {
  value = aws_vpc.cloudops_vpc.id
}
